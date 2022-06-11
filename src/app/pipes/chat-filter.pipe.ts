import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatFilter'
})
export class ChatFilterPipe implements PipeTransform {

  transform(value: any[], chatText: any): unknown {
    if (!chatText) return value
    chatText = chatText.toLowerCase();
    let filteredItems = value.filter(item=> item.fullname.toLowerCase().includes(chatText))
    return filteredItems;
  }

}
