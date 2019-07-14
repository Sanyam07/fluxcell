import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Message from './Message';

export default class Attachment extends Model {
  static get tableName() {
    return 'attachment';
  }

  static get relationMappings() {
    return {
      message: {
        relation: Model.BelongsToOneRelation,
        modelClass: Message,
        join: {
          from: 'attachment.message_id',
          to: 'message.id',
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
