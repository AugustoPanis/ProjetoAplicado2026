const mongoose = require('mongoose');
const crypto = require('crypto');

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: [true, 'CPF é obrigatório'],
      unique: true,
      trim: true,
    },
    token: {
      type: String,
      unique: true,
    },
    canTest: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.pre('save', function () {
  if (!this.token) {
    this.token = crypto.randomBytes(32).toString('hex');
  }
});

module.exports = mongoose.model('Client', clientSchema);
