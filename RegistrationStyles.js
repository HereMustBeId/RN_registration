import { StyleSheet } from 'react-native';
import style from "./config/style";

export const phoneStyles = StyleSheet.create({
   generalView: {
      padding: style.sizes.one,
      backgroundColor: style.colors.white,
      flex: 1,
      alignItems: "stretch",
   },
   textHeader: {
      textAlign: 'center',
      color: style.colors.black,
   },
   bolderHeader: {
      fontFamily: 'Lato-Bold',
   },
   numBlock: {
      marginTop: 10,
      flexDirection: 'row',
   },
   eachNumber: {
      flex: 1,
      marginLeft: 2,
      marginRight: 2,
   },
   borderDefault: {
      borderBottomWidth: 1
   },
   borderDone: {
      borderBottomWidth: 1,
      borderBottomColor: style.colors.blue,
   },
   eachNumberText: {
      ...style.fonts.numbers,
      textAlign: 'center',
      color: style.colors.black,
   },
   button: {
      marginTop: 30,
   }
});

export const passwordStyles = StyleSheet.create({
   generalView: {
      padding: style.sizes.one,
      backgroundColor: style.colors.white,
      flex: 1,
      alignItems: "stretch",
   },
   textHeader: {
      textAlign: 'center',
      color: style.colors.black,
   },
   textConfidence: {
      marginTop: 10
   },
   bolderHeader: {
      fontFamily: 'Lato-Bold',
   },
   numBlock: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 10
   },
   borderDefault: {
      borderBottomWidth: 1
   },
   defaultText: {
      color: style.colors.silver,
   },
   eachNumber: {
      marginLeft: 2,
      marginRight: 2,
   },
   borderDone: {
      borderBottomWidth: 1,
      borderBottomColor: style.colors.blue,
   },
   eachNumberText: {
      ...style.fonts.numbers,
      textAlign: 'center',
      color: style.colors.black,
   },
});