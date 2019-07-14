import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Message from './Message';
import Space from './Space';
import User from './User.js';

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
          to: 'message.channel_id',
        },
      },
      space: {
        relation: Model.BelongsToOneRelation,
        modelClass: Space,
        join: {
          from: 'channel.space_id',
          to: 'space.id',
        },
      },
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'channel.id',
          through: {
            from: 'user_channel.channel_id',
            to: 'user_channel.user_id',
          },
          to: 'user.id',
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
