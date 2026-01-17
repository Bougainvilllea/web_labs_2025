interface Repository<T> {
  create(item: Omit<T, 'id'>): T;
  findById(id: string): T | undefined;
  update(id: string, item: Partial<T>): T | undefined;
  delete(id: string): boolean;
}

interface Entity {
  id: string;
}

class MemoryRepository<T extends Entity> implements Repository<T> {
  private items: Map<string, T> = new Map();

  create(item: Omit<T, 'id'>): T {
    const id = Date.now().toString();
    const newItem = { ...item, id } as T;
    this.items.set(id, newItem);
    return newItem;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;

    const updatedItem = { ...item, ...updates };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }
}

interface Book extends Entity {
  title: string;
  author: string;
  year: number;
  price: number;
}


const bookRepository = new MemoryRepository<Book>();

const book1 = bookRepository.create({
  title: 'TypeScript на практике',
  author: 'Иван Петров',
  year: 2023,
  price: 1500
});

const book2 = bookRepository.create({
  title: 'React для профессионалов',
  author: 'Анна Сидорова',
  year: 2022,
  price: 2000
});

console.log('Созданы книги:');
console.log(book1);
console.log(book2);

const foundBook = bookRepository.findById(book1.id);
console.log('Найдена книга по ID:', foundBook);

const updatedBook = bookRepository.update(book1.id, { price: 1700 });
console.log('Обновленная книга:', updatedBook);

const allBooks = bookRepository.findAll();
console.log('Все книги в репозитории:');
allBooks.forEach(book => console.log(book));

const isDeleted = bookRepository.delete(book2.id);
console.log('Книга удалена:', isDeleted);
console.log('Остались книги:', bookRepository.findAll());