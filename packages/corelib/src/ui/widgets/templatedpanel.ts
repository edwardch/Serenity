﻿import { Fluent, getjQuery } from "@serenity-is/base";
import { Decorators } from "../../types/decorators";
import { validateOptions } from "../../q";
import { TemplatedWidget } from "./templatedwidget";
import { Toolbar, ToolButton } from "./toolbar";
import { WidgetProps } from "./widget";
import { TabsExtensions } from "../helpers/tabsextensions";

@Decorators.registerClass("Serenity.TemplatedPanel")
export class TemplatedPanel<P={}> extends TemplatedWidget<P> {
    constructor(props: WidgetProps<P>) {
        super(props);
        
        this.initValidator();
        this.initTabs();
        this.initToolbar();
    }

    destroy() {
        TabsExtensions.destroy(this.tabs);
        this.tabs = null;

        if (this.toolbar) {
            this.toolbar.destroy();
            this.toolbar = null;
        }

        if (this.validator) {
            let form = this.findById('Form');
            if (form) {
                getjQuery()?.(form)?.remove();
                form?.remove();
            }
            this.validator = null;
        }

        super.destroy();
    }

    protected tabs: Fluent;
    protected toolbar: Toolbar;
    protected validator: any;
    protected isPanel: boolean;
    protected responsive: boolean;

    public arrange(): void {
        Fluent(this.domNode).findAll('.require-layout').forEach(el => {
            Fluent.isVisibleLike(el) && Fluent.trigger(el, "layout");
        });
    }

    protected getToolbarButtons(): ToolButton[] {
        return [];
    }

    protected getValidatorOptions(): any {
        return {};
    }

    protected initTabs(): void {
        var tabsDiv = this.findById('Tabs');
        if (!tabsDiv)
            return;
        this.tabs = TabsExtensions.initialize(tabsDiv, null);
    }

    protected initToolbar(): void {
        var toolbarDiv = this.findById('Toolbar');
        if (!toolbarDiv)
            return;
        this.toolbar = new Toolbar({ buttons: this.getToolbarButtons(), element: toolbarDiv });
    }

    protected initValidator(): void {
        let $ = getjQuery();
        var form = this.findById('Form');
        if ($ && form) {
            var valOptions = this.getValidatorOptions();
            this.validator = $(form).validate?.(validateOptions(valOptions));
        }
    }

    protected resetValidation(): void {
        if (this.validator) {
            (this.validator as any).resetAll();
        }
    }

    protected validateForm(): boolean {
        return this.validator == null || !!this.validator.form();
    }
}