package uk.ac.cam.cl.foxtrot.server;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.glassfish.jersey.server.JSONP;

import com.google.appengine.api.utils.SystemProperty;

@Path("/{dataset}/{year}/{country}")
public class Retriever {

	@GET
	@JSONP(queryParam = "callback")
	@Produces({"application/javascript"})
	public Visualisation getVisualisation(
			@PathParam("dataset") String dataset,
			@PathParam("year") String year,
			@PathParam("country") String country) throws SQLException, IOException {

		String url = null;

		try {
			if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
				Class.forName("com.mysql.jdbc.GoogleDriver");
				url = "jdbc:google:mysql://money-world:database/test?user=root";
			} else {
				Class.forName("com.mysql.jdbc.Driver");
				BufferedReader configReader = new BufferedReader(new FileReader("/media/data/workspace/Money World/server/server.config"));
				url = configReader.readLine();
				configReader.close();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		Connection connection = DriverManager.getConnection(url);

		String agg = "";
		String[] countryArray = country.split("_");
		if ( countryArray.length > 1 ) {
			country = countryArray[0];
			agg = countryArray[1];
		}

		String dataSetCondition = "DataSetCode = '" + dataset + "'";
		String yearCondition = "Year = '" + year + "'";
		String countryCondition = "CountryCode2 = '" + country + "'";
		String dataCondition = " DataSetCode, Year, CountryCode2, Value ";

		if ( agg.equals("avg") ) {
			dataCondition = "AVG(Value)";
		}

		if ( agg.equals("max") ) {
			dataCondition = "MAX(Value)";
		}

		if ( agg.equals("min") ) {
			dataCondition = "MIN(Value)";
		}

		if ( dataset.equals("all") ) {
			dataSetCondition = "DataSetCode LIKE '%'";
		}

		if ( year.equals("all") ) {
			yearCondition = "Year LIKE '%'";
		}

		if ( country.equals("all") ) {
			countryCondition = "CountryCode2 LIKE '%'";
		}

		if ( country.equals("safrica") ) {
			countryCondition = "CountryCode2 IN ('AO', 'BW', 'BI', 'CD', 'KE', 'LS', 'MG', 'MW', 'MZ', 'NA', 'RW', 'ZA', 'SZ', 'TZ', 'UG', 'ZM', 'ZW')";
		}

		if ( country.equals("wafrica") ) {
			countryCondition = "CountryCode2 IN ('DZ', 'BJ', 'BF', 'CI', 'GM', 'GH', 'GN', 'GW', 'LR', 'ML', 'MR', 'MA', 'NE', 'NG', 'SN', 'SL', 'TG', 'TN')";
		}

		String selectStmtString = "SELECT " + dataCondition +
				" FROM DataPoint " +
				"JOIN CountryCode ON DataPoint.CountryCode = CountryCode.CountryCode3 " +
				"WHERE " + dataSetCondition + " AND " + yearCondition + " AND " + countryCondition;
		PreparedStatement selectStmt = null;
		selectStmt = connection.prepareStatement(selectStmtString);

		ResultSet rs = null;
		Visualisation viz = new Visualisation();

		String currentDataSetCode = "";
		String currentYear = "";
		String currentCountryCode = "";
		String currentValue = "";

		try {
			rs = selectStmt.executeQuery();
			if ( agg.equals("") ) {
				while ( rs.next() ) {
					currentDataSetCode = rs.getString(1);
					currentYear = rs.getString(2);
					currentCountryCode = rs.getString(3);
					currentValue = rs.getString(4);

					FullDataPoint currentDataPoint = new FullDataPoint();
					currentDataPoint.setDataSetCode(currentDataSetCode);
					currentDataPoint.setYear(currentYear);
					currentDataPoint.setCountryCode(currentCountryCode);
					currentDataPoint.setValue(currentValue);
					viz.getDataPointList().add(currentDataPoint);
				}
			} else {
				rs.next();
				FullDataPoint currentDataPoint = new FullDataPoint();
				currentDataPoint.setDataSetCode(dataset);
				currentDataPoint.setYear(year);
				currentDataPoint.setCountryCode(country);
				currentDataPoint.setValue(rs.getString(1));
				viz.getDataPointList().add(currentDataPoint);
			}
		} finally {
			selectStmt.close();
		}

		return viz;
	}
}