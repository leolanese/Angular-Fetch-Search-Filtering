import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
  pure: true
})
export class SearchPipe implements PipeTransform {
    transform(data: any[] | null, filterProperty: string, filter: string): any[] {
    if (!data) {
        return [];
    }

    const filterValue = filter.toLowerCase();
    return filterValue
        ? data.filter(item => item[filterProperty].toLowerCase().includes(filterValue))
        : data;
    }
}