import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MESSAGE_TIME } from '../constants/MESSAGE_TIME';
import { SOCKET } from '../constants/SOCKET';
import { showMessage } from '../helpers/functions/showMessage';
import { addChat } from '../store/actions/chat';
import { readProducts } from '../store/actions/product';
import { addSale, deleteSale } from '../store/actions/sale';
import { readSaleManagers } from '../store/actions/sale-manager';
import { RootStateType } from '../types.d';

const ForwardSocketMessage = () => {
  const dispatch = useDispatch();
  const { auth, products, saleManagers } = useSelector((state: RootStateType) => state);

  useEffect(() => {
    dispatch(readSaleManagers());
    dispatch(readProducts());
  }, []);

  useEffect(() => {
    SOCKET.on('chat message', (msgObj) => {
      if (msgObj.from === auth.id || msgObj.to === auth.id) {
        dispatch(addChat(msgObj));
      }
    });

    SOCKET.on('delete sale', (msgObj) => {
      if (msgObj.from === auth.saleManager?.id) {
        if (msgObj.id) {
          dispatch(deleteSale(msgObj));
          showMessage('success', 'Sale deleted', MESSAGE_TIME);
        } else {
          showMessage('error', msgObj.error, MESSAGE_TIME);
        }
      } else {
        dispatch(deleteSale(msgObj));
      }
    });
    // CLEAN UP THE EFFECT
    return () => {
      SOCKET.off('chat message');
      SOCKET.off('delete sale');
    };
  }, []);

  useEffect(() => {
    SOCKET.on('add sale', (msgObj) => {
      if (msgObj.from === auth.id) {
        if (msgObj.sale) {
          dispatch(addSale(msgObj.sale));
          showMessage('success', 'Sale added', MESSAGE_TIME);
        } else {
          showMessage('error', msgObj.error, MESSAGE_TIME);
        }
      } else {
        const getSaleManager = saleManagers.data.find((x) => x.user?.id === msgObj.from);
        const getProduct = products.data.find((x) => x.id === msgObj.sale.product);
        if (getSaleManager && getProduct) {
          getProduct.quantity = getProduct.quantity - msgObj.sale.quantity;
          const saleResponse = { ...msgObj.sale, product: getProduct, saleManager: getSaleManager };
          dispatch(addSale(saleResponse));
        }
      }
    });
    // CLEAN UP THE EFFECT
    return () => {
      SOCKET.off('add sale');
    };
  }, [products, saleManagers]);
  return <div id="forward-socket-message"></div>;
};

export default ForwardSocketMessage;
