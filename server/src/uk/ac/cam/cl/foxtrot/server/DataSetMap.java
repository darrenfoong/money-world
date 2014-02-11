package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;

public class DataSetMap {
	private Map<String, YearMap> dataSetMap = new HashMap<String, YearMap>();

	@XmlElement(name="datasets")
	public Map<String, YearMap> getDataSetMap() {
		return dataSetMap;
	}

	public void setDataSetMap(Map<String, YearMap> dataSetMap) {
		this.dataSetMap = dataSetMap;
	}
}