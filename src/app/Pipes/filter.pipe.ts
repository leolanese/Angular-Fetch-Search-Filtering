import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../Modules/country';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(items: Country[] | null | undefined, searchText: string): Country[] {
    if (!items || !searchText) return [];

    searchText = searchText.toLowerCase();

    return items.filter( (item) => {
      console.table(item)
      return item.name.common.toLowerCase().includes(searchText);
    });
  }

}