import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T> {
    protected items: T[] = [];
    protected currentId = 1;
  
    create(item: T): T {
      (item as any).id = this.currentId++;
      this.items.push(item);
      return item;
    }
  
    findAll(): T[] {
      return this.items;
    }
  
    findOne(id: number): T {
      const item = this.items.find((item) => (item as any).id == id);
      if (!item) {
        throw new NotFoundException(`Item ${id} not found`);
      }
      return item;
    }
  
    update(id: number, updateItem: Partial<T>): T {
      const item = this.findOne(id);
      const updatedItem = { ...item, ...updateItem };
      this.items = this.items.map((item) => (item as any).id == id ? updatedItem : item);
      return updatedItem;
    }
  
    remove(id: number): T {
      const item = this.findOne(id);
      this.items = this.items.filter((item) => (item as any).id != id);
      return item;
    }
  
  }
  