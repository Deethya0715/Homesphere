import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

export default function TenantList({ route }) {
  const navigation = useNavigation();
  const { fetchTenants } = route.params;

  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantAddress, setTenantAddress] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [leaseStart, setLeaseStart] = useState(new Date());
  const [leaseEnd, setLeaseEnd] = useState('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);

  const handleConfirmStart = (date) => {
    setLeaseStart(date);
    hideDatePicker();
  };

  const handleConfirmEnd = (date) => {
    setLeaseEnd(date);
    hideEndDatePicker();
  };

  const handleAddTenant = async () => {
    if (!tenantName || !tenantEmail || !tenantAddress || !tenantPhone || !leaseStart || !leaseEnd) {
      Alert.alert('All fields must be filled!');
      return;
    }

    const newTenant = {
      "House Address": tenantAddress,
      "Tenant Name": tenantName,
      "Email Address": tenantEmail,
      "Phone Number": tenantPhone,
      "Lease Start Date": leaseStart.toISOString(),
      "Lease End Date": leaseEnd.toISOString(),
      "Paid/Unpaid": 'Unpaid', // Default to 'Unpaid'
      "Rent Per Month": 1200, // Set a default rent amount (can be updated)
    };

    try {
      await axios.post('http://192.168.68.122:3000/tenants', newTenant);
      Alert.alert('Success', 'Tenant added successfully!');
      fetchTenants(); // Refresh tenant list on the dashboard
      navigation.goBack();
    } catch (error) {
      console.error('Error adding tenant:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add tenant.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tenant Name:</Text>
      <TextInput style={styles.input} value={tenantName} onChangeText={setTenantName} />

      <Text>Tenant Email:</Text>
      <TextInput style={styles.input} value={tenantEmail} onChangeText={setTenantEmail} />

      <Text>Tenant Address:</Text>
      <TextInput style={styles.input} value={tenantAddress} onChangeText={setTenantAddress} />

      <Text>Tenant Phone:</Text>
      <TextInput style={styles.input} value={tenantPhone} onChangeText={setTenantPhone} />

      <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
        <Text>{leaseStart.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showEndDatePicker} style={styles.datePickerButton}>
        <Text>{leaseEnd ? leaseEnd.toDateString() : 'Select End Date'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.squareButton} onPress={handleAddTenant}>
        <Text style={styles.buttonText}>Add Tenant</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={leaseStart}
        onConfirm={handleConfirmStart}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        date={leaseEnd ? leaseEnd : new Date()}
        onConfirm={handleConfirmEnd}
        onCancel={hideEndDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  datePickerButton: {
    marginVertical: 10,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
  },
  squareButton: {
    width: 125,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
