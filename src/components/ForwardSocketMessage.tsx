import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { SERVER_BASE_URL } from '../constants';
import { MESSAGE_TIME } from '../constants/MESSAGE_TIME';
import { showMessage } from '../helpers/functions/showMessage';
import { addChat } from '../store/actions/chat';
import { readProducts } from '../store/actions/product';
import { addSale, deleteSale } from '../store/actions/sale';
import { readSaleManagers } from '../store/actions/sale-manager';
import { RootStateType } from '../types.d';
const socket = io(SERVER_BASE_URL);

const ForwardSocketMessage = () => {
  const dispatch = useDispatch();
  const { auth, products, saleManagers } = useSelector((state: RootStateType) => state);

  useEffect(() => {
    dispatch(readSaleManagers());
    dispatch(readProducts());
  }, []);

  useEffect(() => {
    socket.on('chat message', (msgObj) => {
      if (msgObj.from === auth.id || msgObj.to === auth.id) {
        dispatch(addChat(msgObj));
      }
    });

    socket.on('delete sale', (msgObj) => {
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
      // socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on('add sale', (msgObj) => {
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
  }, [products, saleManagers]);
  return <div id="forward-socket-message"></div>;
};

export default ForwardSocketMessage;
