package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;

public class YearMap {
	private Map<String, CountryMap> yearMap = new HashMap<String, CountryMap>();

	@XmlElement(name="years")
	public Map<String, CountryMap> getYearMap() {
		return yearMap;
	}

	public void setYearMap(Map<String, CountryMap> yearMap) {
		this.yearMap = yearMap;
	}
}