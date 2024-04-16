import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../Modules/country';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(items: Country[] | null | undefined, searchText: string): Country[] {
    if (!items) return [];

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      console.log(`Filter pipe triggered: `, item.name.common.toLowerCase().includes(searchText));
      return item.name.common.toLowerCase().includes(searchText);
    });
  }

}