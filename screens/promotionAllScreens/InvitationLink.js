import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Entypo from "react-native-vector-icons/Entypo"

import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';

const InvitationLink = ({ route }) => {
  const { referalCode } = route.params;
  const navigation = useNavigation();
  const [showCopyModal, setShowCopyModal] = useState(false)

  const baseLink = 'https://betninja.co.in/register?invitationCode=';
  const linkToGenerateQRCodeFor = baseLink + referalCode;
  // const linkToGenerateQRCodeFor = baseLink;


  const initiateWhatsApp = () => {
    const message = `Join Bet Ninja using my referral link: ${linkToGenerateQRCodeFor}  `;

    let url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure WhatsApp is installed on your device');
      });
  };
  const initiateTelegram = () => {
    const message = `Join Bet Ninja using my referral link: ${linkToGenerateQRCodeFor}`;

    let url = `tg://msg?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Telegram Opened');
      })
      .catch(() => {
        alert('Make sure Telegram is installed on your device');
      });
  };

  const copyToClipboard = () => {
    Clipboard.setString(linkToGenerateQRCodeFor);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

  };

  return (
    <View style={styles.container}>
      <LinearGradient style={{ flex: 1, alignItems: 'center', width: '100%' }} colors={['#C1E1C1', '#9FE2BF', '#00FF7F']} >
        <View style={{ marginBottom: 50, alignItems: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', width: '100%', borderBottomStartRadius: 14, borderBottomEndRadius: 14 }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 10 }} onPress={() => navigation.goBack()}>
            <EvilIcons name='chevron-left' size={35} color={'black'} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 40, fontWeight: 'bold', color: 'black' }}>Invitation</Text>
        </View>
        <Text style={styles.title}>Invitation Link for Bet Ninja</Text>
        <View style={{ height: '30%', width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 10 }}>
          <QRCode
            value={linkToGenerateQRCodeFor}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
        <Text style={{ color: 'black', marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>Scan QR code to Invite</Text>

        {/* <Text style={styles.link}>{linkToGenerateQRCodeFor}</Text> */}
        <View style={{ width: '100%', height: 50, alignItems: 'center', marginVertical: 30 }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Invite More Friends to Earn More </Text>
          <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>You will get big offers and commissin</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(linkToGenerateQRCodeFor)}
          style={{ width: '95%', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: 'green', borderRadius: 10, marginVertical: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>INVITATION LINK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={copyToClipboard} style={{ width: '95%', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 10, marginVertical: 10, borderWidth: 1 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Copy Link</Text>
        </TouchableOpacity>
        <View style={{ height: 'auto', width: '95%', backgroundColor: 'rgba(255, 255, 255, 0.7)', marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 10, borderRadius: 10, position: 'absolute', bottom: 10 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Share on </Text>
          <TouchableOpacity
            onPress={initiateWhatsApp}>
            <Image source={require('../../assets/whatsapp.webp')} style={{ height: 50, width: 50 }} />
            <Text style={{ color: 'grey' }}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={initiateTelegram}>
            <Image source={require('../../assets/telegram.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ marginTop: 5, color: 'grey' }}>Telegram</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Modal visible={showCopyModal} transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: 150, // Set your desired width
            height: 150, // Set your desired height
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Entypo name="check" size={30} color={'white'} />
            <Text style={{ color: 'white' }}>Copy Succesfull</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InvitationLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
  },
});
