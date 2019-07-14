import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Message from './Message';
import Space from './Space';
import Channel from './Channel.js';

export default class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      message: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'user.id',
          to: 'message.user_id',
        },
      },
      space: {
        relation: Model.BelongsToOneRelation,
        modelClass: Space,
        join: {
          from: 'user.space_id',
          to: 'space.id',
        },
      },
      channel: {
        relation: Model.ManyToManyRelation,
        modelClass: Channel,
        join: {
          from: 'user.id',
          through: {
            from: 'user_channel.user_id',
            to: 'user_channel.channel_id',
          },
          to: 'channel.id',
        },
      },
    };
  }
  $beforeUpdate() {
    this.updated_at = getLocalTime();
  }
  $beforeInsert() {
    this.created_at = getLocalTime();
  }
}
