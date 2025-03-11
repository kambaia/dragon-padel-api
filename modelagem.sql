-- Tabela: Usuarios
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('Jogador', 'Organizador')) NOT NULL
);

-- Tabela: Categorias (necessária para a relação com participantes)
CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

-- Tabela: Participantes
CREATE TABLE participantes (
    participante_id SERIAL PRIMARY KEY,
    perfil VARCHAR(100),
    nome VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    categoria_id INTEGER REFERENCES categorias(categoria_id),
    usuario_id INTEGER REFERENCES usuarios(usuario_id)
);

-- Tabela: Reserva
CREATE TABLE reservas (
    reserva_id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    criador_id INTEGER REFERENCES usuarios(usuario_id),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_inicio TIME NOT NULL,
    data_termino TIME NOT NULL,
    clube VARCHAR(100),
    preco DECIMAL(10,2),
    campo VARCHAR(100),
    CONSTRAINT check_horario CHECK (data_termino > data_inicio)
);

-- Tabela: Partida (tabela de relacionamento entre reserva e participantes)
CREATE TABLE partidas (
    partida_id SERIAL PRIMARY KEY,
    reserva_id INTEGER REFERENCES reservas(reserva_id),
    participante_id INTEGER REFERENCES participantes(participante_id),
    CONSTRAINT unique_reserva_participante UNIQUE (reserva_id, participante_id)
);

-- Índices para melhorar performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_reservas_criador ON reservas(criador_id);
CREATE INDEX idx_partidas_reserva ON partidas(reserva_id);
CREATE INDEX idx_partidas_participante ON partidas(participante_id);