import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './accounts.interface';
import { ParseParamIntPipe } from 'pipes/parse-param-int.pipe';
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto';

@Controller('accounts')
export class AccountsController {
    constructor(
        private accountService: AccountsService,
    ) {}

    @Get()
    async findAll(): Promise<{ accounts: Account[]}> {
        const accounts = await this.accountService.findAll();
    
        return { accounts };
    }

    @Get(':id')
    async findOne(@Param('id', new ParseParamIntPipe()) id: number): Promise<{ account: Account }> {
        const account = await this.accountService.findOne(id);

        return { account };
    }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
        await this.accountService.create(createAccountDto);

        return { message: 'Succesfully Created Account' };
    }

    @Put(':id')
    async update(@Param('id', new ParseParamIntPipe()) id: number, @Body() updateAccountDto: UpdateAccountDto) {
            await this.accountService.update(id, updateAccountDto);

            return { message: 'Succesfully Updated Account' };
    }

    @Delete(':id')
    async delete(@Param('id', new ParseParamIntPipe()) id: number) {
        await this.accountService.remove(id);

        return {
            message: 'Succesfully Deleted Account'
        };
    }
}
