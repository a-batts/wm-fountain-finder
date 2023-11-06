import { Configuration } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express';
import '@tsed/ajv';
import '@tsed/swagger';
export declare class Server {
    protected app: PlatformApplication;
    protected settings: Configuration;
}
