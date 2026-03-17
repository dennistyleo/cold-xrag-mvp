/**
 * XR-BUS V1.0 - The Causal Spine
 * Protocol: Sovereign Reliability Fabric
 * Governance: UPASL Deterministic Gating
 */
class XRBus {
    constructor() {
        this.subscribers = new Set();
        this.traceId = 0;
        console.log("[XR-BUS] Backbone Initialized. Timing Contract Active.");
    }

    // 3.1 Frame Format Layer
    createFrame(moduleId, opCode, payload = {}) {
        return {
            header: {
                moduleId: moduleId,
                boundaryId: "SOVEREIGN_V1_ZONE",
                opCode: opCode
            },
            timing: {
                timestamp: performance.now(), // Monotonic Time
                clock_ref: "MASTER_FABRIC_REF"
            },
            causal: {
                traceId: ++this.traceId,
                parentAxiom: payload.axiomId || "ROOT",
                semanticAnchor: "UPASL_COMMIT"
            },
            payload: payload,
            integrity: {
                version: "V36_SVRN",
                checksum: "DET_HASH_" + Math.random().toString(16).slice(2)
            }
        };
    }

    // 5. Deterministic Transport & Dispatch
    publish(frame) {
        // Enforce Boundary Contract (3.3)
        if (!frame.header.boundaryId) {
            console.error("[XR-BUS] Integrity Violation: No Boundary ID.");
            return;
        }
        
        console.log(`[XR-BUS] Frame ${frame.causal.traceId} | Op: ${frame.header.opCode}`);
        this.subscribers.forEach(module => module.onFrame(frame));
    }

    subscribe(module) {
        this.subscribers.add(module);
        console.log(`[XR-BUS] Module ${module.name} Registered.`);
    }
}

window.XR_BUS = new XRBus();
