import type { Container } from "tsparticles-core";
import type { IClickEvent } from "tsparticles-core/Options/Interfaces/Interactivity/Events/IClickEvent";
import { EditorGroup, EditorType } from "object-gui";
import { ClickMode } from "tsparticles-core";
import { AbsorberClickMode, EmitterClickMode } from "tsparticles";
import { EditorBase } from "../../../../EditorBase";
import { AbsorbersPlugin } from "tsparticles-core/Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "tsparticles-core/Plugins/Emitters/EmittersPlugin";

export class ClickEventsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IClickEvent;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onClick", "Click Events");
        this.options = this.group.data as IClickEvent;

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        const modeSelectInput = this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: ClickMode.attract,
                },
                {
                    value: ClickMode.bubble,
                },
                {
                    value: ClickMode.pause,
                },
                {
                    value: ClickMode.push,
                },
                {
                    value: ClickMode.remove,
                },
                {
                    value: ClickMode.repulse,
                },
                {
                    value: ClickMode.trail,
                },
            ]);

        if (typeof AbsorbersPlugin !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem(AbsorberClickMode.absorber, undefined, absorbersGroup);
        }

        if (typeof EmittersPlugin !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem(EmitterClickMode.emitter, undefined, emittersGroup);
        }
    }
}