import { Model } from 'objection';
import { getLocalTime } from '../../utils/helper.js';
import Message from './Message';
import Station from './Station';
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
      station: {
        relation: Model.BelongsToOneRelation,
        modelClass: Station,
        join: {
          from: 'user.station_id',
          to: 'station.id',
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
