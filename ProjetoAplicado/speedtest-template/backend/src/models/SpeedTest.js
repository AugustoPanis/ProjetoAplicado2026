const mongoose = require('mongoose');

const speedTestSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Cliente é obrigatório'],
    },
    download: {
      type: Number, // Mbps
      required: [true, 'Download é obrigatório'],
    },
    upload: {
      type: Number, // Mbps
      required: [true, 'Upload é obrigatório'],
    },
    latency: {
      type: Number, // ms
      required: [true, 'Latência é obrigatória'],
    },
    jitter: {
      type: Number, // ms
      required: [true, 'Jitter é obrigatório'],
    },
    wifi: {
      ssid: {
        type: String, // Nome da rede Wi-Fi
        required: [true, 'SSID é obrigatório'],
      },
      bssid: {
        type: String, // Identificador do roteador (MAC)
      },
      signalStrength: {
        type: Number, // dBm (ex: -65)
      },
    },
    testedAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// Índice para buscar os últimos testes de um cliente de forma eficiente
speedTestSchema.index({ clientId: 1, testedAt: -1 });

// Método estático: retorna os últimos 3 testes de um cliente
speedTestSchema.statics.getLastThree = function (clientId) {
  return this.find({ clientId })
    .sort({ testedAt: -1 })
    .limit(3);
};

// Após salvar um teste, remove registros antigos mantendo apenas os 3 mais recentes
speedTestSchema.post('save', async function () {
  const tests = await this.constructor
    .find({ clientId: this.clientId })
    .sort({ testedAt: -1 })
    .select('_id');

  if (tests.length > 3) {
    const idsToDelete = tests.slice(3).map((t) => t._id);
    await this.constructor.deleteMany({ _id: { $in: idsToDelete } });
  }
});

module.exports = mongoose.model('SpeedTest', speedTestSchema);
