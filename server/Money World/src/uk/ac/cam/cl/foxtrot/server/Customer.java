package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

@XmlRootElement
public class Customer {
	private Map<String, Address> addressMap = new HashMap<String, Address>();

	@XmlJavaTypeAdapter(CustomerMapAdapter.class)
	@XmlElement(name="addresses")
	public Map<String, Address> getAddressMap() {
		return addressMap;
	}

	public void setAddressMap(Map<String, Address> addressMap) {
		this.addressMap = addressMap;
	}
}