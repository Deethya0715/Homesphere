import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Modal, ScrollView, Alert } from 'react-native';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import axios from 'axios'; // Import axios for API calls

export default function OwnerDashboard() {
  const navigation = useNavigation();
  const [tenantDetails, setTenantDetails] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch tenants from the backend
  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.68.122:3000/tenants'); // Updated to match your endpoint
      setTenants(response.data); // Assuming the response contains a list of tenants
    } catch (error) {
      console.error('Error fetching tenants:', error);
      Alert.alert('Error', 'Failed to fetch tenants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // Function to handle tenant block click to show details
  const showTenantDetails = (tenant) => {
    setTenantDetails(tenant);
  };

  // Delete tenant from the backend and update state
  const deleteTenant = async (tenantId) => {
    try {
      const response = await axios.delete(`http://192.168.68.122:3000/tenants/${tenantId}`);
      if (response.status === 200) {
        setTenants(tenants.filter((tenant) => tenant.id !== tenantId));
        Alert.alert('Success', 'Tenant deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting tenant:', error);
      Alert.alert('Error', 'Failed to delete tenant.');
    }
  };

  const renderRightActions = (tenantId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTenant(tenantId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.textHome}>Welcome to Owner Dashboard!</Text>

        {/* Tenant Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tenant Overview</Text>
          {loading ? (
            <Text>Loading tenants...</Text>
          ) : tenants.length === 0 ? (
            <Text style={styles.noTenantsText}>No tenants added yet.</Text>
          ) : (
            tenants.map((tenant) => (
              <Swipeable
                key={tenant.id}
                renderRightActions={() => renderRightActions(tenant.id)}
              >
                <TouchableOpacity
                  style={styles.tenantBlock}
                  onPress={() => showTenantDetails(tenant)}
                >
                  <Text style={styles.tenantName}>{tenant['Tenant Name']}</Text>
                  <Text style={styles.paymentStatus}>{tenant['Paid/Unpaid'] || 'Unpaid'}</Text>
                </TouchableOpacity>
              </Swipeable>
            ))
          )}
        </View>

        {/* Add Tenant Button */}
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate('TenantList', { fetchTenants })}
        >
          <Text style={styles.buttonText}>Add Tenant</Text>
        </TouchableOpacity>

        {/* Tenant Details Modal */}
        {tenantDetails && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={tenantDetails !== null}
            onRequestClose={() => setTenantDetails(null)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Tenant Details</Text>
                <Text>Name: {tenantDetails['Tenant Name']}</Text>
                <Text>Email: {tenantDetails['Email Address']}</Text>
                <Text>Address: {tenantDetails['House Address']}</Text>
                <Text>Phone: {tenantDetails['Phone Number']}</Text>
                <Text>Lease Start: {new Date(tenantDetails['Lease Start Date']).toLocaleDateString()}</Text>
                <Text>Lease End: {new Date(tenantDetails['Lease End Date']).toLocaleDateString()}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setTenantDetails(null)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles remain the same as your original code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'flex-start', // Keeps content starting at the top
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textHome: {
    fontSize: 24,
    marginVertical: 20,
    color: colors.black,
    textAlign: 'center',
  },
  squareButton: {
    width: 125,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.pearl,
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tenantBlock: {
    backgroundColor: colors.green,
    padding: 10,
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 100, // Adjust width to keep it centered
  },
  tenantName: {
    color: colors.pearl,
    fontSize: 14,
  },
  paymentStatus: {
    color: colors.pearl,
    fontSize: 14,
  },
  noTenantsText: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: colors.periwinkle,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    zIndex: 999, // Ensure the modal is above all other content
  },
  modalContent: {
    backgroundColor: colors.pearl,
    padding: 20,
    borderRadius: 8,
    width: '80%',
    zIndex: 1000, // Ensure modal content is clickable and above the background
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
