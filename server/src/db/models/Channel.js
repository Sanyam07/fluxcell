import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Message from './Message';
import Space from './Space';

export default class Channel extends Model {
  static get tableName() {
    return 'channel';
  }

  static get relationMappings() {
    return {
      message: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'channel.id',
          to: 'message.channelid',
        },
      },
      space: {
        relation: Model.BelongsToOneRelation,
        modelClass: Space,
        join: {
          from: 'space.id',
          to: 'channel.spaceid',
        },
      },
    };
  }
  $beforeUpdate() {
    this.updated = getLocalTime();
  }
}
