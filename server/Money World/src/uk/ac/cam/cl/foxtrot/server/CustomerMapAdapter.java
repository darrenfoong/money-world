package uk.ac.cam.cl.foxtrot.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class CustomerMapAdapter extends XmlAdapter<CustomerMapAdapter.AdaptedMap, Map<String, Address>> {

	public static class AdaptedMap {
		public List<AdaptedEntry> entries = new ArrayList<AdaptedEntry>();
	}

	public static class AdaptedEntry {
		public String key;
		public Address value;
	}

	@Override
	public AdaptedMap marshal(Map<String, Address> map) throws Exception {
		AdaptedMap adaptedMap = new AdaptedMap();
		for(Entry<String, Address> entry : map.entrySet()) {
			AdaptedEntry adaptedEntry = new AdaptedEntry();
			adaptedEntry.key = entry.getKey();
			adaptedEntry.value = entry.getValue();
			adaptedMap.entries.add(adaptedEntry);
		}
		return adaptedMap;
	}

	@Override
	public Map<String, Address> unmarshal(AdaptedMap adaptedMap) throws Exception {
		Map<String, Address> map = new HashMap<String, Address>();
		for(AdaptedEntry adaptedEntry : adaptedMap.entries) {
			map.put(adaptedEntry.key, adaptedEntry.value);
		}
		return map;
	}
}