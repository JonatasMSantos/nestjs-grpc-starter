# Projeto NestJS com gRPC - Investment Bank

Este é um projeto de exemplo que demonstra a comunicação entre dois aplicativos NestJS usando gRPC. O projeto consiste em dois aplicativos, `investment-bank` e `nestjs-grpc-starter`, que se comunicam via gRPC e externa uma API rest para o cliente.

## Requisitos

- Node.js (v14 ou superior)
- NestJS
- TypeScript
- [gRPC](https://grpc.io/)
- MongoDB (Docker opcional, para executar o mongodb)

## Instalação

Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

```bash
git clone https://github.com/JonatasMSantos/nestjs-grpc-starter.git
```

## Subir o mongodb (Docker)

```bash
docker compose up
```

## Subir o serviço com gRPC
```bash
npm run start:dev investment-bank  
```

## Subir o serviço REST conectado ao gRPC
```bash
npm run start:dev
```

