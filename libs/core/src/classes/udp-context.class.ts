import { RemoteInfo } from "dgram";

export class UdpContext {
  constructor(
    private msg: Buffer,
    private rinfo: RemoteInfo,
  ) {}
}