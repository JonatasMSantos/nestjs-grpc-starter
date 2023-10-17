import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrderService')
  async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return {
      order: {
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,
      },
    };
  }

  @GrpcMethod('OrderService')
  async findAllOrders(@Payload() findAllOrdersDTO: { account_id: string }) {
    const orders = await this.ordersService.findAll(
      findAllOrdersDTO.account_id,
    );
    return {
      orders: orders.map((o) => ({
        order_id: o.id.toString(),
        account_id: o.account_id,
        asset_id: o.asset_id,
        quantity: o.quantity,
        status: o.status,
      })),
    };
  }

  @GrpcMethod('OrderService')
  async findOneOrder(@Payload() findOneOrderDTO: { order_id: string }) {
    const order = await this.ordersService.findOne(findOneOrderDTO.order_id);
    console.log(order);
    return {
      order: {
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,
      },
    };
  }

  /*
  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }*/
}
