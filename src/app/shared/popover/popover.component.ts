// /* eslint-disable @angular-eslint/no-output-on-prefix */
import {Component, ContentChild, TemplateRef} from '@angular/core';
import {ViewTypeService} from '@data/services/view-type.service';

/**
 * @todo(dmitry2199): to rename selector or component name, they should be same
 */
@Component({
  selector: 'app-popover-card',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  public vt: ViewTypeService = new ViewTypeService();
  private hover = false;
  private pendingTimeout;
  @ContentChild(TemplateRef) template;

  maybeOpen(popoverRef): void {
    clearTimeout(this.pendingTimeout);
    if (!popoverRef.isOpen()) {
      popoverRef.open();
    }
  }

  timeDelayClose(popoverRef, delay= 500): void {
    clearTimeout(this.pendingTimeout);
    this.pendingTimeout = setTimeout(() => {
      if (!this.hover) {
        this.hover = false;
        popoverRef.close();
      }
    }, delay);
  }

  maintainOpen(popoverRef): void {
    this.hover = true;
  }

  leavePopover(popoverRef): void {
    this.hover = false;
    this.timeDelayClose(popoverRef, 200);
  }
}
