import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AllInOneSDKManager from 'paytm_allinone_react-native';

const PaytmSdk = () => {
  const handlePayment = async () => {
    AllInOneSDKManager.startTransaction(
      orderId,
      mid,
      tranxToken,
      amount,
      callbackUrl,
      isStaging,
      appInvokeRestricted,
      urlScheme
    )
      .then((result) => {
        updateUI(result);
      })
      .catch((err) => {
        handleError(err);
      });

  }

  return (
    <View>
      <Button onPress={handlePayment}>Click</Button>
    </View>
  )
}

export default PaytmSdk

const styles = StyleSheet.create({})