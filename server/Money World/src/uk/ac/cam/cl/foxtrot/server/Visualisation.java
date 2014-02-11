package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

public class Visualisation {
	private String dataset;
	private String year;
	private String country;
	private Map<String, YearMap> dataSetMap = new HashMap<String, YearMap>();

	public void setDataSet(String dataset) {
		this.dataset = dataset;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setDataSetMap(Map<String, YearMap> dataSetMap) {
		this.dataSetMap = dataSetMap;
	}

	@XmlAttribute
	public String getDataSet() {
		return dataset;
	}

	@XmlAttribute
	public String getYear() {
		return year;
	}

	@XmlAttribute
	public String getCountry() {
		return country;
	}

	@XmlElement(name="data")
	public Map<String, YearMap> getDataSetMap() {
		return dataSetMap;
	}
}