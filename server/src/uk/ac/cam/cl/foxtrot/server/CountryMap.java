package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;

public class CountryMap {
	private Map<String, String> dataPointMap = new HashMap<String, String>();

	@XmlElement(name="countries")
	public Map<String, String> getDataPointMap() {
		return dataPointMap;
	}

	public void setDataPointMap(Map<String, String> dataPointMap) {
		this.dataPointMap = dataPointMap;
	}
}