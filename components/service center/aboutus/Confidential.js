import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Constants/Screen'
import { Colors } from '../../Constants/Colors'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions'


const Confidential = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 10 }}><TouchableOpacity
        onPress={() => navigation.navigate('AboutUs')}
        style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors.gray }}>
        <Ionicons name='return-up-back' color={'black'} size={24} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.black, marginLeft: 50 }}>Confidential Agreement</Text></View>



      <View style={{ flex: 1, width: SCREEN_WIDTH * 0.8, alignSelf: 'center' }}>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}>  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Interpretation and Definitions
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Interpretation
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          The words of which the initial letter is capitalized have meanings defined under the following conditions.
          The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          Definition
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          For the purposes of this Privacy Policy:
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>You</Text> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the
          Service, as applicable.
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers
          to <Text style={{ color: 'blue', }}>betninja.co.in</Text>
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Affiliate</Text> Affiliate means an entity that controls. is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Account</Text>  means a unique account created for You to access our Service or parts of our Service.Website refers to betninja.co.in accessible from betninja.co.in
          Service refers to the Website.
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Service</Text>
          Service refers to the Website.
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Service Provider</Text>  means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> Third-party </Text>Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service. Personal Data is any infonnation that relates to an identified or identifiable individual
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Cookies </Text>  are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
          <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Device</Text>  means any device that can access the Service "such as a computer, a cellphone or a digital tablet.</Text><Text style={{ color: 'black', fontWeight: 'bold' }}> Usage Data</Text> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> Third-party </Text>Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service. Personal Data is any infonnation that relates to an identified or identifiable individual
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          Collecting and using our personal data
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          types data collected
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          Personal data
        </Text>
        <Text style={{ marginLeft: 10, color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(90), alignSelf: 'center', marginVertical: 5 }}>
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to
        </Text>
        <Text>
          Email address </Text>
        <Text>First name and last name</Text>
        <Text>Phone number</Text>
        <Text>Address, State, Province, ZIP/Postal code, City Usage Data</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}>   Usage Data may include information such as Your Device's Internet Protocol address (eg IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}> When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unuque ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Intenet browser You use, unique device identifiers and other diagnostic data.</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}> We may also collect information thunt Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
          Tracking Technologies and Cookies  We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
          You can instruct your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if you do not accept Cookies, You may not be able to use some parts of our Service.</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}>  Cookies can be "Persistent" or "Session" Cookies.
          Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
          We use both session and persistent Cookies for the purposes set out below:
          <Text style={{ color: 'black', fontWeight: 'bold' }}> Necessary/Essential Cookies</Text>
          Type: Session Cookies
          Administered by: Us
          Purpose: These Cookies are essential to provide You with services available through the Website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services. </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 10 }}>  Cookies Policy / Notice Acceptance CookiesAdministered by: Us
          Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide you with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
          For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy.
          Use of Your Personal Data
          The Company may use Personal Data for the following
          purposes: </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          use of personal data
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5 }}>
          The company may use personal data for the following purposes
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> To provide and maintain our Service.</Text>
          including to monitor the usage of our Service.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> To manage Your Account.</Text>
          To manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> For the performance of a contract:</Text>
          the development. compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>To contact You:</Text>
          To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.Civics, eng шe security upumes, when necessary or reasonable for their implementation
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> To provide you with news,</Text>
          ,special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}> To manage Your requests: </Text>
          To attend and manage Your requests to Us.
          We may share your personal information in the following situations:
          With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You For Business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>With Affiliates: </Text>
          We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>With other users: </Text>
          when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see You name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Yourof Your activity, communicate with You and view Your profile.
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Retention of Your Personal Data
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
          The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Transfer of Your Personal Data
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>

          Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to-and- maintained on-computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
          Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
          The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unlessthere are adequate controls in place including the security of Your data and other personal information.

        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Disclosure of Your Personal Data
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', fontSize: 10 }}>
          Business Transactions
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
        </Text>


        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', fontSize: 10 }}>
          Law enforcement
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        </Text>
        <Text style={{ color: 'black', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center', fontSize: 12 }}>
          other legal requirements
        </Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
          Comply with a legal obligation
          Protect and defend the rights or property of the
          Company
          Prevent or investigate possible wrongdoing in
          connection with the Service
          Protect the personal safety of Users of the Service or
          the public
          Protect against legal liability
          Security of Your Personal Data
          The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.While We strive to use commercially acceptable means to protect Your Personal Data. We cannot guarantee its absolute security.
        </Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}> Children's Privacy</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
          If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
          Links to Other Websites
          Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
          We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Changes to other policy</Text>
        <Text style={{ color: 'grey', backgroundColor: '#fafafa', padding: 5, width: responsiveWidth(95), alignSelf: 'center' }}>

          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new PrivacyPolicy on this page.
          We will let you know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

        </Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Contacts</Text>
        <Text>

          If you have any questions about this Privacy Policy, You
          can contact us:

        </Text>
        <Text style={{ marginVertical: 10 }}> By visiting this page on our website:<Text style={{ color: 'blue' }}>betninja.co.in</Text></Text>
      </View>
    </ScrollView>
  )
}

export default Confidential

const styles = StyleSheet.create({
  container: {
    flex: 1, alignSelf: 'center', width: responsiveWidth(100), backgroundColor: 'white'
  }
})