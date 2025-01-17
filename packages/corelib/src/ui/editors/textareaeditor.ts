﻿import { Fluent } from "@serenity-is/base";
import { Decorators } from "../../types/decorators";
import { IStringValue } from "../../interfaces";
import { EditorProps, EditorWidget } from "../widgets/widget";

export interface TextAreaEditorOptions {
    cols?: number;
    rows?: number;
}

@Decorators.registerEditor('Serenity.TextAreaEditor', [IStringValue])
export class TextAreaEditor<P extends TextAreaEditorOptions = TextAreaEditorOptions> extends EditorWidget<P> {

    static override createDefaultElement() { return document.createElement("textarea"); }

    constructor(props: EditorProps<P>) {
        super(props);
        let input = Fluent(this.domNode);
        if (this.options.cols !== 0) {
            input.attr('cols', this.options.cols ?? 80);
        }
        if (this.options.rows !== 0) {
            input.attr('rows', this.options.rows ?? 6);
        }
    }

    public get value(): string {
        return Fluent(this.domNode).val() as string;
    }

    protected get_value(): string {
        return this.value;
    }

    public set value(value: string) {
        Fluent(this.domNode).val(value);
    }

    protected set_value(value: string): void {
        this.value = value;
    }
}