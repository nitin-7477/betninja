import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import RazorpayCheckout from 'react-native-razorpay';


const DepositeScreen = ({ route }) => {
  const navigation = useNavigation();
  const depositAmount = route.params?.depositAmount;
  const extraAmount = route.params?.extraAmount;
  const [amount, setAmount] = useState('');
  const [userInformation, setUserInformation] = useState('')
  const [selectedBtn, setSelectedBtn] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState(1)
  const isButtonDisabled = parseInt(amount) >= 100;
  const [refreshing, setRefreshing] = useState(false);

  // const handleAmountChange = (value) => {
  //   setAmount(value);
  // };

  useEffect(() => {
    fetchUserData()
  }, [])

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // Call your data fetching function here (e.g., fetchCommissionData)
      await fetchUserData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };
  // console.log(depositAmount);
  const fetchUserData = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      });
      setUserInformation(response.data);

    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
    finally {
      setLoading(false)
    }

  };


  const handleDeposite = async () => {
    try {
      setAmount("")
      if (selectedBank == 2) {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('Login')
          return;
        }
        var body = { amount: amount }
        const response = await axios.post(`${process.env.SERVERURL}/api/deposit/deposits`, body, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });

        console.log("This is response of hitting deposite api", response);
      }
      else if (selectedBank == 3) {

        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.jpg',
          currency: 'INR',
          key: 'rzp_test_f5OuQuaLaJyL4o',
          amount: amount * 100,
          name: 'Bet Ninja',
          order_id: '',//Replace this with an order_id created using Orders API.
          prefill: {
            email: 'nitinkumar@example.com',
            contact: '7477235745',
            name: 'Nitin Kumar'
          }, method: {
            netbanking: true,
            card: true,
            wallet: true,
            upi: true,
            paylater: false
          }, config: {
            display: {
              hide: [{ method: 'paylater' }]
            }
          },
          theme: { color: '#53a20e' },

        }
        RazorpayCheckout.open(options).then((data) => {
          // handle success
          alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
          // handle failure

        });
      }
      else if (selectedBank == 1) {
        navigation.navigate('QrScanner', { amount })
      }

    }
    catch (error) {
      console.log(error);

    }
  }


  const handleDepositeMoney = (value, btn) => {
    setAmount(value.toString())
    setSelectedBtn(btn)
  }

  useEffect(() => {
    // Set the initial amount when the component mounts
    if (depositAmount) {
      setAmount(depositAmount.toString());
    }
  }, [depositAmount]);

  const handleAmountChange = (text) => {

    let enteredAmount = parseFloat(text);

    if (isNaN(enteredAmount) || enteredAmount < 100) {

      setAmount(text);

    } else {

      setAmount(enteredAmount.toString());
    }
  };

  const PaymentGateWay = () => {


  }



  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000', '#00ff00', '#0000ff']} // Set the colors of the refresh indicator
        />
      }
    >
      <View style={styles.depositSection}>
        <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Deposit</Text>
        </View>
        {/* *********************balance card******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: '#d9ad82', marginVertical: 10, borderRadius: 10, padding: 10 }}>

          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>Balance</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginTop: 5 }}>₹{userInformation?.wallet?.toFixed(2)}</Text>
            <Image source={require('../../assets/wallet/arrow.png')} style={{ height: 15, width: 15, marginHorizontal: 5 }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/chip.png')} style={{ height: 20, width: 30, marginTop: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>***  ***</Text>
          </View>
          {loading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size={50} color="gold" />
            </View>
          )}
        </View>
        {/* *********************balance card******************* */}

        {/* *********************Select the Bank******************* */}
        <View style={{ flexDirection: 'row', width: responsiveWidth(97), justifyContent: 'space-between', alignContent: 'center', marginBottom: 10, }}>
          <TouchableOpacity
            onPress={() => setSelectedBank(1)}
            style={{ height: responsiveHeight(14), width: responsiveWidth(32), backgroundColor: selectedBank == 1 ? '#d9ad82' : '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment3.png')} style={{ height: 50, width: 50 }} />
            <Text >UPI-QR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedBank(2)} style={{ height: responsiveHeight(14), width: responsiveWidth(32), backgroundColor: selectedBank == 2 ? '#d9ad82' : '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ color: 'black' }}>Bank Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedBank(3)}
            style={{ height: responsiveHeight(14), width: responsiveWidth(32), backgroundColor: selectedBank == 3 ? '#d9ad82' : '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment2.png')} style={{ height: 40, width: 50 }} />
            <Text >UPI-APP</Text>
          </TouchableOpacity>


        </View>

        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>

        </View>




        <View style={{ height: SCREEN_HEIGHT * 0.3, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />

            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Deposite Amount</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 1 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(500, 1)}>

              <Text style={{ fontWeight: 'bold', color: selectedBtn == 1 ? 'white' : 'grey' }}>₹ 500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 2 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(1000, 2)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 2 ? 'white' : 'grey' }}>₹ 1K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 3 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(5000, 3)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 3 ? 'white' : 'grey' }}>₹ 5K</Text>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 4 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(10000, 4)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 4 ? 'white' : 'grey' }}>₹ 10K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 5 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(20000, 5)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 5 ? 'white' : 'grey' }}>₹ 20K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 6 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(50000, 6)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 6 ? 'white' : 'grey' }}>₹ 50K</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.amountInputContainer}>
            <Text style={{ fontSize: 26, color: '#d9ad82', paddingLeft: 10 }}>₹</Text>
            <Text style={{ fontSize: 26, color: 'grey', paddingLeft: 10 }}>|</Text>

            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="Enter Amount"
              value={amount}
              onChangeText={handleAmountChange}
            />

            {extraAmount == null ? <></> : (<View style={{ width: 'auto', backgroundColor: 'rgba(144, 238, 144,0.4)', padding: 4, borderRadius: 10 }}><Text style={{ color: 'green' }}>{extraAmount !== "" ? extraAmount : ""}</Text></View>)}
          </View>
        </View>
        {/* *********************Deposite Amount******************* */}


        <TouchableOpacity
          disabled={!isButtonDisabled}
          style={[styles.depositButton, { backgroundColor: isButtonDisabled ? '#d9ad82' : 'grey' }]}
          onPress={handleDeposite}
        >
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>


        <View style={{ height: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#eeeeee', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />
            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Recharge Instruction</Text>
          </View>

          <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
              <Text style={{ width: SCREEN_WIDTH * 0.77, color: 'black' }}>If the transfer time is up, please fill out the deposite form again</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
              <Text style={{ width: SCREEN_WIDTH * 0.75, color: 'black' }}>The Transfer amount must match the order you created, ohterwise the money can not be credited successfully</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
              <Text style={{ width: SCREEN_WIDTH * 0.7, color: 'black' }}>If you transfer the wrong amount, our company will not be responsible for this lost account</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
              <Text style={{ width: SCREEN_WIDTH * 0.75, color: 'black' }}>NOTE: Do not cancel the deposite order after the money has been tranferred</Text>
            </View>
          </View>
        </View>


      </View>
    </ScrollView >
  )
}

export default DepositeScreen


const styles = {
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center'

  },
  redBtn: {

    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    borderWidth: 0.7,
    borderRadius: 3,
    borderColor: 'grey'



  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 20,
    color: 'green',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  icon: {
    alignItems: 'center',
  },
  tabButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButtonsContainer: {
    paddingHorizontal: 20,
  },
  depositSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold'

  },
  amountInputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    width: responsiveWidth(96),
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row', alignItems: 'center', marginTop: 10
  },
  amountInput: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: 'black', width: '65%',
  },
  depositButton: {
    backgroundColor: '#d9ad82',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  withDrawButton: {
    backgroundColor: '#d9ad82',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10
  },
  depositButtonText: {
    fontSize: 16,
    color: 'white',
  },
  rechargeInstructionsTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  rechargeInstructionItem: {
    fontSize: 16,
    marginBottom: 5,
  }, activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
};