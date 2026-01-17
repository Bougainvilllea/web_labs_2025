function addTag(tags: readonly string[], newTag: string): string[] {
  return [...tags, newTag];
}

function removeTag(tags: readonly string[], tagToRemove: string): string[] {
  return tags.filter(tag => tag !== tagToRemove);
}

function mergeTags(tags1: readonly string[], tags2: readonly string[]): string[] {
  return Array.from(new Set([...tags1, ...tags2]));
}

const initialTags: readonly string[] = ['typescript', 'javascript'];

console.log('Исходные теги:', initialTags);

const withNewTag = addTag(initialTags, 'nodejs');
console.log('После добавления "nodejs":', withNewTag);

const withoutJs = removeTag(withNewTag, 'javascript');
console.log('После удаления "javascript":', withoutJs);

const otherTags = ['nodejs', 'react', 'typescript'];
const merged = mergeTags(withoutJs, otherTags);
console.log('После слияния:', merged);

console.log('Исходный массив не изменился:', initialTags);