import { BigInt, Address } from "@graphprotocol/graph-ts";

import {
  NftMarketplace,
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";

import {
  ItemListed,
  ItemBought,
  ItemCanceled,
  ActiveItem,
} from "./../generated/schema";

/**
 * When an item is bought, we update itemBought object in our graph and assign a buyer to the activeItem
 * We dont delete our activeItem object, we just identify that it is bought by having a buyer listed,
 * if it does not then it is still on the market
 * @param event
 */
export function handleItemBought(event: ItemBoughtEvent): void {
  //Save that event in our graph
  //update our activeitems
  //get or create an itemListed object
  //each item needs a unique id
  //Create an ItemBought object from ItemBought event
  //ItemBoughtEventL: just raw event
  //ItemoughtObject: what we save
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //update params for itemBough t
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;
  activeItem!.buyer = event.params.buyer;
  itemBought.save();
  activeItem!.save();
}

export function handleItemCanceled(event: ItemCanceledEvent): void {}

export function handleItemListed(event: ItemListedEvent): void {}

//a function to create a unique id
function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
