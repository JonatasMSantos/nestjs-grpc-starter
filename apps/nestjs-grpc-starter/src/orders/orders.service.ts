import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Metadata } from '@grpc/grpc-js';
import { CreateOrderDto } from './dto/create-order.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { OrderDTO } from './dto/order.dto';

interface OrderGrpcClient {
  createOrder(
    data: CreateOrderDto,
    metadata?: Metadata,
  ): Observable<{ order: OrderDTO }>;
  findAllOrders(
    data: { account_id: string },
    metadata?: Metadata,
  ): Observable<{ orders: OrderDTO[] }>;
  findOneOrder(
    data: { order_id: string },
    metadata?: Metadata,
  ): Observable<{ order: OrderDTO }>;
}

@Injectable()
export class OrdersService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'bank',
      protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
      loader: { keepCase: true },
    },
  })
  clientGrpc: ClientGrpc;

  private orderGrpcClient: OrderGrpcClient;

  onModuleInit() {
    this.orderGrpcClient = this.clientGrpc.getService('OrderService');
  }

  async create(createOrderDto: CreateOrderDto) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');

    const result = await lastValueFrom(
      this.orderGrpcClient.createOrder(createOrderDto, metadata),
    );
    return result.order;
  }

  async findAll(account_id: string) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');

    const result = await lastValueFrom(
      this.orderGrpcClient.findAllOrders({ account_id }, metadata),
    );
    return result.orders;
  }

  async findOne(order_id: string) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');

    const result = await lastValueFrom(
      this.orderGrpcClient.findOneOrder({ order_id }, metadata),
    );
    return result.order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
