package uk.ac.cam.cl.foxtrot.server;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.XmlAdapter;

import org.eclipse.persistence.oxm.annotations.XmlVariableNode;

public class CopyOfDataPointMapAdapter extends XmlAdapter<CopyOfDataPointMapAdapter.AdaptedMap, Map<String, DataPoint>>{

	public static class AdaptedMap {
		@XmlVariableNode("key")
		List<AdaptedEntry> entries = new ArrayList<AdaptedEntry>();
	}

	public static class AdaptedEntry {
		@XmlTransient
		public String key;
		@XmlValue
		public DataPoint value;
	}

	@Override
	public AdaptedMap marshal(Map<String, DataPoint> map) throws Exception {
		AdaptedMap adaptedMap = new AdaptedMap();
		for(Entry<String, DataPoint> entry : map.entrySet()) {
			AdaptedEntry adaptedEntry = new AdaptedEntry();
			adaptedEntry.key = entry.getKey();
			adaptedEntry.value = entry.getValue();
			adaptedMap.entries.add(adaptedEntry);
		}
		return adaptedMap;
	}

	@Override
	public Map<String, DataPoint> unmarshal(AdaptedMap adaptedMap) throws Exception {
		List<AdaptedEntry> adaptedEntries = adaptedMap.entries;
		Map<String, DataPoint> map = new LinkedHashMap<String, DataPoint>(adaptedEntries.size());
		for(AdaptedEntry adaptedEntry : adaptedEntries) {
			map.put(adaptedEntry.key, adaptedEntry.value);
		}
		return map;
	}
}
