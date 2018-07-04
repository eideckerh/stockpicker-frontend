import {User} from '../../user/model/user';
import {Symbol} from '../../stock/model/symbol';

export class Trade {
  id: number;
  user: User;
  symbol: Symbol;
  volume: number;
  opened: Date;
  closed: Date;
  openValue: number;
  closeValue: number;
}
