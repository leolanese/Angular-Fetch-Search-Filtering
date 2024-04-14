import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
  pure: true
})
export class SearchPipe implements PipeTransform {
    transform(data: any[] | null, filterProperty: string, filter: string): any[] {
        if (!data) return [];

        // 2
        const filterValue = filter.toLowerCase();

        return data.filter((x) => {
            console.table(x)
            return x.title.toLowerCase().includes(filterValue);
        });
    }
}