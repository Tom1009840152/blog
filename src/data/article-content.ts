import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import postcss from 'postcss';
import { parse, serialize } from 'parse5';
import { sitePath } from '../utils/paths';

export type NativeArticleContent = {
  html: string;
  css: string;
  script: string;
  meta: string[];
  toc: ArticleTocItem[];
};

type ArticleTocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

type HtmlNode = {
  tagName?: string;
  attrs?: Array<{ name: string; value: string }>;
  childNodes?: HtmlNode[];
  value?: string;
};

const contentRoot = resolve(process.cwd(), 'content');
const cache = new Map<string, Promise<NativeArticleContent>>();
const scope = '.native-article-content';

function walk(node: HtmlNode, visit: (node: HtmlNode) => void) {
  visit(node);
  node.childNodes?.forEach(child => walk(child, visit));
}

function hasClass(node: HtmlNode, className: string) {
  return node.attrs?.some(attribute =>
    attribute.name === 'class' && attribute.value.split(/\s+/).includes(className)
  );
}

function textContent(node: HtmlNode) {
  let value = node.value || '';
  node.childNodes?.forEach(child => { value += textContent(child); });
  return value;
}

function getAttribute(node: HtmlNode, name: string) {
  return node.attrs?.find(attribute => attribute.name === name)?.value;
}

function setAttribute(node: HtmlNode, name: string, value: string) {
  const attributes = node.attrs || [];
  const existing = attributes.find(attribute => attribute.name === name);
  if (existing) existing.value = value;
  else attributes.push({ name, value });
  node.attrs = attributes;
}

function extractTableOfContents(article: HtmlNode) {
  const toc: ArticleTocItem[] = [];
  const reservedIds = new Set<string>();
  const emittedIds = new Set<string>();

  walk(article, node => {
    const id = getAttribute(node, 'id');
    if (id) reservedIds.add(id);
  });

  walk(article, node => {
    if (node.tagName !== 'h2' && node.tagName !== 'h3') return;
    const label = textContent(node).replace(/\s+/g, ' ').trim();
    if (!label) return;

    let id = getAttribute(node, 'id');
    if (!id || emittedIds.has(id)) {
      const prefix = `article-section-${String(toc.length + 1).padStart(2, '0')}`;
      id = prefix;
      let suffix = 2;
      while (reservedIds.has(id) || emittedIds.has(id)) {
        id = `${prefix}-${suffix}`;
        suffix += 1;
      }
      setAttribute(node, 'id', id);
      reservedIds.add(id);
    }

    emittedIds.add(id);
    toc.push({ id, label, level: node.tagName === 'h2' ? 2 : 3 });
  });

  return toc;
}

function insideKeyframes(rule: postcss.Rule) {
  let parent = rule.parent;
  while (parent) {
    if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return true;
    parent = parent.parent;
  }
  return false;
}

function scopeSelector(selector: string) {
  const trimmed = selector.trim();
  if (!trimmed) return trimmed;
  if (trimmed.includes(scope)) return trimmed;
  if (trimmed.startsWith(':root')) return trimmed.replace(/^:root/, scope);
  if (/^(html|body)(?=$|[\s.#:[>+~])/.test(trimmed)) {
    return trimmed.replace(/^(html|body)/, scope);
  }
  return `${scope} ${trimmed}`;
}

function scopeCss(css: string) {
  const root = postcss.parse(css);
  root.walkRules(rule => {
    if (insideKeyframes(rule)) return;
    rule.selectors = rule.selectors.map(scopeSelector);

    if (rule.selector === scope) {
      rule.walkDecls(declaration => {
        if (['background', 'min-height', 'height', 'margin', 'padding', 'overflow'].includes(declaration.prop)) {
          declaration.remove();
        }
      });
    }
  });
  return root.toString();
}

function rewriteAssetPaths(html: string) {
  const assetRoot = sitePath('/assets/');
  return html
    .replaceAll('../../assets/', assetRoot)
    .replaceAll('../assets/', assetRoot)
    .replaceAll('..\\..\\assets\\', assetRoot)
    .replaceAll('..\\assets\\', assetRoot);
}

async function readNativeContent(sourceFile: string): Promise<NativeArticleContent> {
  const sourcePath = resolve(contentRoot, sourceFile);
  const source = await readFile(sourcePath, 'utf8');
  const document = parse(source) as unknown as HtmlNode;
  let article: HtmlNode | undefined;
  let metaRow: HtmlNode | undefined;
  const styles: string[] = [];
  const scripts: string[] = [];

  walk(document, node => {
    if (node.tagName === 'article' && hasClass(node, 'article-body')) article = node;
    if (!metaRow && hasClass(node, 'meta-row')) metaRow = node;
    if (node.tagName === 'style') styles.push(textContent(node));
    if (node.tagName === 'script') scripts.push(textContent(node));
  });

  if (!article) throw new Error(`Article body not found in ${sourceFile}`);
  const interactiveScript = scripts.find(script => script.trim().length > 1000) || '';
  const toc = extractTableOfContents(article);

  return {
    html: rewriteAssetPaths(serialize(article as never)),
    css: scopeCss(styles.join('\n')),
    script: interactiveScript,
    meta: metaRow?.childNodes
      ?.filter(node => node.tagName === 'span')
      .map(node => textContent(node).trim())
      .filter(Boolean) || [],
    toc
  };
}

export function loadNativeArticle(sourceFile: string) {
  if (!cache.has(sourceFile)) {
    const pending = readNativeContent(sourceFile).catch(error => {
      cache.delete(sourceFile);
      throw error;
    });
    cache.set(sourceFile, pending);
  }
  return cache.get(sourceFile)!;
}
