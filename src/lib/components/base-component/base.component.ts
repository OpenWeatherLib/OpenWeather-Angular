import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export class BaseComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];

  readonly registerSubscription = (subscription: Subscription): number => this.subscriptions.push(subscription);

  readonly removeSubscription = (subscription: Subscription): void => {
    const subscriptionIndex = this.subscriptions.findIndex(x => x === subscription);
    if (subscriptionIndex > -1) {
      this.subscriptions.splice(subscriptionIndex, 1);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
