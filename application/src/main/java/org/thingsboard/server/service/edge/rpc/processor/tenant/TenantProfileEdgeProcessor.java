/**
 * Copyright © 2016-2024 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.thingsboard.server.service.edge.rpc.processor.tenant;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thingsboard.server.common.data.EdgeUtils;
import org.thingsboard.server.common.data.TenantProfile;
import org.thingsboard.server.common.data.edge.EdgeEvent;
import org.thingsboard.server.common.data.edge.EdgeEventActionType;
import org.thingsboard.server.common.data.id.TenantProfileId;
import org.thingsboard.server.gen.edge.v1.DownlinkMsg;
import org.thingsboard.server.gen.edge.v1.EdgeVersion;
import org.thingsboard.server.gen.edge.v1.TenantProfileUpdateMsg;
import org.thingsboard.server.gen.edge.v1.UpdateMsgType;
import org.thingsboard.server.queue.util.TbCoreComponent;
import org.thingsboard.server.service.edge.rpc.constructor.tenant.TenantMsgConstructor;
import org.thingsboard.server.service.edge.rpc.constructor.tenant.TenantMsgConstructorFactory;
import org.thingsboard.server.service.edge.rpc.processor.BaseEdgeProcessor;

@Slf4j
@Component
@TbCoreComponent
public class TenantProfileEdgeProcessor extends BaseEdgeProcessor {

    @Autowired
    private TenantMsgConstructorFactory tenantMsgConstructorFactory;

    public DownlinkMsg convertTenantProfileEventToDownlink(EdgeEvent edgeEvent, EdgeVersion edgeVersion) {
        TenantProfileId tenantProfileId = new TenantProfileId(edgeEvent.getEntityId());
        var msgConstructor = ((TenantMsgConstructor) tenantMsgConstructorFactory.getMsgConstructorByEdgeVersion(edgeVersion));
        if (EdgeEventActionType.UPDATED.equals(edgeEvent.getAction())) {
            TenantProfile tenantProfile = edgeCtx.getTenantProfileService().findTenantProfileById(edgeEvent.getTenantId(), tenantProfileId);
            if (tenantProfile != null) {
                UpdateMsgType msgType = getUpdateMsgType(edgeEvent.getAction());
                TenantProfileUpdateMsg tenantProfileUpdateMsg = msgConstructor.constructTenantProfileUpdateMsg(msgType, tenantProfile, edgeVersion);
                return DownlinkMsg.newBuilder()
                        .setDownlinkMsgId(EdgeUtils.nextPositiveInt())
                        .addTenantProfileUpdateMsg(tenantProfileUpdateMsg)
                        .build();
            }
        }
        return null;
    }

}
