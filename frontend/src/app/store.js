import { configureStore } from "@reduxjs/toolkit";
import ActiveItemSlice from "../features/forms/ActiveItemSlice";
import activeOrderBySlice from "../features/forms/activeOrderBySlice";
import AddCartSlice from "../features/forms/AddCartSlice";
import displayRecentSlice from "../features/forms/displayRecentSlice";
import orderItemsSlice from "../features/forms/orderItemsSlice";
import setMinutesSlice from "../features/forms/setMinutesSlice";
import ViewCartSlice from "../features/forms/ViewCartSlice";

export const store = configureStore({
  reducer: {
    add_cart: AddCartSlice,
    active_item: ActiveItemSlice,
    order_items: orderItemsSlice,
    view_cart: ViewCartSlice,
    set_minutes: setMinutesSlice,
    display_recent: displayRecentSlice,
    active_orderby: activeOrderBySlice,
  },
});
