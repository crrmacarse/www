import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, DNSHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const portfolioWebsite = await this.health.check([
      () => this.dns.pingCheck('Portfolio Website', 'http://crrmacarse.github.io/'),
    ]);
  
    const personalServer = await this.health.check([
      () => this.dns.pingCheck('Personal Server', 'http://139.59.100.139/'),
    ]);

    return {
      portfolioWebsite,
      personalServer,
    };
  }
}