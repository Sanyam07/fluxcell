import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Attachment from './Attachment.js';
import User from './User';
import Channel from './Channel';

export default class Message extends Model {
  static get tableName() {
    return 'message';
  }

  static get relationMappings() {
    return {
      channel: {
        relation: Model.BelongsToOneRelation,
        modelClass: Channel,
        join: {
          from: 'message.channel_id',
          to: 'channel.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'message.user_id',
          to: 'user.id',
        },
      },
      attachment: {
        relation: Model.HasManyRelation,
        modelClass: Attachment,
        join: {
          from: 'message.id',
          to: 'attachment.message_id',
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
