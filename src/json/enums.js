export const ASSET_CATEGORY = {
    ELECTRONIC: 'ELECTRONIC',
    FURNITURE: 'FURNITURE',
    BUILDING: 'BUILDING',
    TRANSPORT: 'TRANSPORT'
  };
  
 export const categoryOptions = Object.keys(ASSET_CATEGORY).map(key => ({
    text: ASSET_CATEGORY[key],
    value: key
  }));


  export const ASSET_STATUS = {
    NEW: 'NEW',
    USED: 'USED',
    REPAIRED: 'REPAIRED',
    BROKEN: 'BROKEN',
    DISPOSED: 'DISPOSED'
  };
  
 export const statusOptions = Object.keys(ASSET_STATUS).map(key => ({
    text: ASSET_STATUS[key],
    value: key
  }));


  export const FURNITURE_TYPE = {
    WOOD: 'WOOD',
    IRON: 'IRON',
    PLASTIC: 'PLASTIC',
    WOODIRON: 'WOODIRON',
    WOODSPONGE: 'WOODSPONGE'
  };
  
 export const furnitureOptions = Object.keys(FURNITURE_TYPE).map(key => ({
    text: FURNITURE_TYPE[key],
    value: key
  }));

  export const TRANSPORT_TYPE = {
    CAR: 'CAR',
    BAJAJ: 'BAJAJ',
  };
  
 export const transportOptions = Object.keys(TRANSPORT_TYPE).map(key => ({
    text: TRANSPORT_TYPE[key],
    value: key
  }));

  export const ODERSTATUS = {
    1: 'Approve',
  };
  
 export const OrderStatusOptions = Object.keys(ODERSTATUS).map(key => ({
    text: ODERSTATUS[key],
    value: key
  }));

  export const REJECTSTATUS = {
    2: 'Reject',
  };
  
 export const RejectStatusOptions = Object.keys(REJECTSTATUS).map(key => ({
    text: REJECTSTATUS[key],
    value: key
  }));

  export const REPAIRSTATUS = {
    REPAIRED: 'REPAIRED',
    DISPOSED: 'DISPOSED',
  };
  
 export const repairStatusOptions = Object.keys(REPAIRSTATUS).map(key => ({
    text: REPAIRSTATUS[key],
    value: key
  }));

  
 